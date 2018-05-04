CONF="/etc/nginx/conf.d/default.conf"

echo "Setting up frontend configuration"
sed -i "s/VHOST_HOSTNAME/$VHOST_HOSTNAME/" $CONF
sed -i "s@WORKDIR@$WORKDIR@" $CONF


echo "ADRIAN PRINGAO"

exec nginx -g "daemon off;"
