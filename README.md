# OCR Flask app
A simple flask app that takes an image as input and returns the text within it.

## Install python packages
- pytessract
- flask
- OpenCv
- Pillow

## Use 
  - Run the application
    ```python app.py```
    Run the web application and use it.
  - API
    api end point
    ```curl -i -X POST -F files=@image.png http://127.0.0.1:5000/api/ocr```
    also add the preprocess parameter (thresh or blur).

## Screenshots

![Alt text](/static/screenshots/1.png?raw=true )
![Alt text](/static/screenshots/2.png?raw=true )
![Alt text](/static/screenshots/3.png?raw=true )
