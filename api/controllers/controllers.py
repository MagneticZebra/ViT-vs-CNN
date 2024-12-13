from api.main import app
from fastapi import Request

app.post("/api/upload")
async def upload(request: Request):
    """
    Request object
    {
        image: base64 string
    }

    Response object
    {
        success: True
    }
    """

    body = await request.json()
    image_base64 = body.get("image")
