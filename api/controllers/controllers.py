from api.main import app
# from fastapi import Request
from fastapi import UploadFile, File, HTTPException
import os

app.post("/api/upload")
async def upload(file: UploadFile = File(...)):
    """
    Request object
    {
        file: uploaded file
    }

    Response object
    {
        success: True
    }
    """

    try: 
        print("Uploaded file name:", file.filename)
        parent_directory = os.path.dirname(os.path.dirname(__file__))
        save_path = os.path.join(parent_directory, file.filename)
        with open(save_path, "wb") as f:
            f.write(await file.read())
        
        return {"success": True}
    except Exception as e:
        raise HTTPException(status_code=500, detail={"message": f"Error uploading image: {str(e)}", "success": False})
