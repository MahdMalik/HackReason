import subprocess
from flask import jsonify
import json

# The function Vercel will run when a request is made to /api/backend
def handler(request):
    # Ensure the request is POST and get the data
    if request.method == 'POST':
        try:
            query_phrase = request.get_json()
            return {
                "statusCode": 200,
                "body": json.dumps({"output": "hi"})
            }
            # You can keep your logic the same for file operations or subprocess
            file_path = "/path/to/testLogic.pl"  # Use a relative path or environment variable
            
            with open(file_path, 'a') as file:
                file.write("\n?- " + query_phrase)
            
            call = subprocess.Popen(
                ["wsl", "/home/mahd/.ciao/build/bin/scasp", "testLogic.pl"],
                stdin=subprocess.PIPE, stdout=subprocess.PIPE,
                text=True, universal_newlines=True
            )
            
            output, err = call.communicate(timeout=10800)
            
            # Return the output as a JSON response
            return jsonify(output)
        except Exception as e:
            return jsonify({"error": f"Failed to process the request: {str(e)}"}), 500
    else:
        return jsonify({"error": "Method Not Allowed Fool"}), 405
