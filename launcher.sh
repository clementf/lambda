pm2 start --name handler handler/log_sender.js
pm2 start --name batch_receiver batch/log_receiver.js
pm2 start --name api api/api.js
pm2 start --name speed speed/log_receiver.js
pm2 start --name batch batch/generate_batch_views.js
while true; do
	pm2 restart batch
	sleep 1800
done
