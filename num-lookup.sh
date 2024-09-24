#!/bin/bash

# Check if a phone number is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <PHONE_NUMBER>"
  exit 1
fi

PHONE_NUMBER=$1
API_KEY="48a3206751039c9734fef3f35ccab1b4"
API_URL="http://apilayer.net/api/validate?access_key=$API_KEY&number=$PHONE_NUMBER"

# Get the phone number information
RESPONSE=$(curl -s $API_URL)

# Check if the response contains an error
if echo "$RESPONSE" | grep -q "\"success\":false"; then
  echo "Error: Unable to retrieve information for phone number $PHONE_NUMBER"
  exit 1
fi

# Parse the response
COUNTRY=$(echo $RESPONSE | jq -r '.country_name')
LOCATION=$(echo $RESPONSE | jq -r '.location')
CARRIER=$(echo $RESPONSE | jq -r '.carrier')
LINE_TYPE=$(echo $RESPONSE | jq -r '.line_type')

echo "Information for phone number $PHONE_NUMBER:"
echo "Country: $COUNTRY"
echo "Location: $LOCATION"
echo "Carrier: $CARRIER"
echo "Line Type: $LINE_TYPE"

exit 0
