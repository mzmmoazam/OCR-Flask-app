# can use request module
import requests
api = "http://localhost:5000/api/ocr"
files = {'image': open('../ocr_using_video/test.png', 'rb')}

# preprocess = blur or thresh
params = {"preprocess" : "blur"}
print(requests.post(api,params,files=files ).text)


# For Linux and mac users
# curl -i -X POST -F files=@test.png http://127.0.0.1:5000/api/ocr