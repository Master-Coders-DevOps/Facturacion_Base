local_dir='INGRESA_AQUI_LA_RUTA_A_LA_CARPETA_DEL_PROYECTO'

server_user=developer;
server_ip=INGRESA_AQUI_EL_IP_DEL_SERVIDOR;
server_dir=/home/$server_user/INGRESA_AQUI_EL_NOMBRE_DE_LA_CARPETA_DEL_PROYECTO_EN_EL_SERVIDOR;

origin=$local_dir;
destination=$server_user@$server_ip:$server_dir;

rsync -cizP --recursive --delete --exclude-from=excludePatterns  $origin  $destination