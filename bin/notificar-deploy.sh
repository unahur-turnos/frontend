#!/bin/bash

if [ $# -lt 1 ]; then
    echo -e "WARNING!!\nYou need to pass the WEBHOOK_URL environment variable as the second argument to this script.\nFor details & guide, visit: https://github.com/DiscordHooks/travis-ci-discord-webhook" && exit
fi

VERSION=$1
WEBHOOK_URL=$2
AVATAR_URL="https://freedesignfile.com/upload/2017/08/rocket-icon-vector.png"
URL="https://github.com/unahur-turnos/frontend/releases/tag/$VERSION"
TITLE="¡Versión $VERSION publicada!"

TIMESTAMP=$(date -u +%FT%TZ)
WEBHOOK_DATA='{
    "username": "",
    "avatar_url": "'"$AVATAR_URL"'",
    "embeds": [ {
            "color": 3066993,
            "title": "'"$TITLE"'",
            "url": "'"$URL"'",
            "description": "'":pencil: Hacé clic en el enlace que está aquí arriba para saber qué cambió."'",
            "timestamp": "'"$TIMESTAMP"'"
    } ]
}'

echo -e "[Webhook]: Sending webhook to Discord...\\n";

(curl --fail --progress-bar -A "Deploy-Webhook" -H Content-Type:application/json -H X-Author:k3rn31p4nic#8383 -d "$WEBHOOK_DATA" "$WEBHOOK_URL" \
&& echo -e "\\n[Webhook]: Successfully sent the webhook.") || echo -e "\\n[Webhook]: Unable to send webhook."
