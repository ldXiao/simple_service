from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

app = FastAPI(title="Simple Service API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class Item(BaseModel):
    id: Optional[int] = None
    name: str
    description: Optional[str] = None

class ItemResponse(BaseModel):
    id: int
    name: str
    description: Optional[str] = None

# In-memory storage (replace with database in production)
items_db: List[ItemResponse] = [
    ItemResponse(id=1, name="Sample Item 1", description="This is a sample item"),
    ItemResponse(id=2, name="Sample Item 2", description="Another sample item"),
]
next_id = 3

@app.get("/")
async def root():
    return {"message": "Welcome to Simple Service API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.get("/api/items", response_model=List[ItemResponse])
async def get_items():
    return items_db

@app.get("/api/items/{item_id}", response_model=ItemResponse)
async def get_item(item_id: int):
    item = next((item for item in items_db if item.id == item_id), None)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

@app.post("/api/items", response_model=ItemResponse)
async def create_item(item: Item):
    global next_id
    new_item = ItemResponse(id=next_id, name=item.name, description=item.description)
    items_db.append(new_item)
    next_id += 1
    return new_item

@app.put("/api/items/{item_id}", response_model=ItemResponse)
async def update_item(item_id: int, item: Item):
    existing_item = next((i for i in items_db if i.id == item_id), None)
    if existing_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    
    existing_item.name = item.name
    existing_item.description = item.description
    return existing_item

@app.delete("/api/items/{item_id}")
async def delete_item(item_id: int):
    global items_db
    items_db = [item for item in items_db if item.id != item_id]
    return {"message": "Item deleted successfully"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
