from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
import json
import joblib

model = joblib.load("disaster/static/classifier.pkl")


class ReactView(APIView):

    # serializer_class = ReactSerializer

    def get(self, request):
        # detail = [ {"name": detail.name,"detail": detail.detail}
        # for detail in React.objects.all()]
        data = request.data
        print(data)
        res = {
            "data": data,
            "out": ""
        }
        return Response(json.loads(json.dumps(res)))

    def post(self, request):
        data = request.data
        query = data['detail']
        classification_labels = model.predict([query])[0]
        # classification_results = dict(zip(df.columns[4:], classification_labels))
        res = {"out_post": "done", "data": classification_labels.tolist()}
        res = json.dumps(res)
        res = json.loads(res)
        return Response(res)
