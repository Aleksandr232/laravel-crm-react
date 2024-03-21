TYPE=VIEW
query=select `information_schema`.`columns`.`TABLE_SCHEMA` AS `table_schema`,`information_schema`.`columns`.`TABLE_NAME` AS `table_name`,`information_schema`.`columns`.`COLUMN_NAME` AS `column_name`,`information_schema`.`columns`.`DATA_TYPE` AS `data_type`,`information_schema`.`columns`.`COLUMN_TYPE` AS `column_type`,locate(\'unsigned\',`information_schema`.`columns`.`COLUMN_TYPE`) = 0 AS `is_signed`,locate(\'unsigned\',`information_schema`.`columns`.`COLUMN_TYPE`) > 0 AS `is_unsigned`,case `information_schema`.`columns`.`DATA_TYPE` when \'tinyint\' then 255 when \'smallint\' then 65535 when \'mediumint\' then 16777215 when \'int\' then 4294967295 when \'bigint\' then 18446744073709551615 end >> if(locate(\'unsigned\',`information_schema`.`columns`.`COLUMN_TYPE`) > 0,0,1) AS `max_value`,`information_schema`.`tables`.`AUTO_INCREMENT` AS `auto_increment`,`information_schema`.`tables`.`AUTO_INCREMENT` / (case `information_schema`.`columns`.`DATA_TYPE` when \'tinyint\' then 255 when \'smallint\' then 65535 when \'mediumint\' then 16777215 when \'int\' then 4294967295 when \'bigint\' then 18446744073709551615 end >> if(locate(\'unsigned\',`information_schema`.`columns`.`COLUMN_TYPE`) > 0,0,1)) AS `auto_increment_ratio` from (`information_schema`.`columns` join `information_schema`.`tables` on(`information_schema`.`columns`.`TABLE_SCHEMA` = `information_schema`.`tables`.`TABLE_SCHEMA` and `information_schema`.`columns`.`TABLE_NAME` = `information_schema`.`tables`.`TABLE_NAME`)) where `information_schema`.`columns`.`TABLE_SCHEMA` not in (\'mysql\',\'sys\',\'INFORMATION_SCHEMA\',\'performance_schema\') and `information_schema`.`tables`.`TABLE_TYPE` = \'BASE TABLE\' and `information_schema`.`columns`.`EXTRA` = \'auto_increment\' order by `information_schema`.`tables`.`AUTO_INCREMENT` / (case `information_schema`.`columns`.`DATA_TYPE` when \'tinyint\' then 255 when \'smallint\' then 65535 when \'mediumint\' then 16777215 when \'int\' then 4294967295 when \'bigint\' then 18446744073709551615 end >> if(locate(\'unsigned\',`information_schema`.`columns`.`COLUMN_TYPE`) > 0,0,1)) desc,case `information_schema`.`columns`.`DATA_TYPE` when \'tinyint\' then 255 when \'smallint\' then 65535 when \'mediumint\' then 16777215 when \'int\' then 4294967295 when \'bigint\' then 18446744073709551615 end >> if(locate(\'unsigned\',`information_schema`.`columns`.`COLUMN_TYPE`) > 0,0,1)
md5=149e162c15ae1a0cb14a7ca374e833f2
updatable=0
algorithm=1
definer_user=mariadb.sys
definer_host=localhost
suid=0
with_check_option=0
timestamp=0001711061309575360
create-version=2
source=SELECT TABLE_SCHEMA,\n       TABLE_NAME,\n       COLUMN_NAME,\n       DATA_TYPE,\n       COLUMN_TYPE,\n       (LOCATE(\'unsigned\', COLUMN_TYPE) = 0) AS is_signed,\n       (LOCATE(\'unsigned\', COLUMN_TYPE) > 0) AS is_unsigned,\n       (\n          CASE DATA_TYPE\n            WHEN \'tinyint\' THEN 255\n            WHEN \'smallint\' THEN 65535\n            WHEN \'mediumint\' THEN 16777215\n            WHEN \'int\' THEN 4294967295\n            WHEN \'bigint\' THEN 18446744073709551615\n          END >> IF(LOCATE(\'unsigned\', COLUMN_TYPE) > 0, 0, 1)\n       ) AS max_value,\n       AUTO_INCREMENT,\n       AUTO_INCREMENT / (\n         CASE DATA_TYPE\n           WHEN \'tinyint\' THEN 255\n           WHEN \'smallint\' THEN 65535\n           WHEN \'mediumint\' THEN 16777215\n           WHEN \'int\' THEN 4294967295\n           WHEN \'bigint\' THEN 18446744073709551615\n         END >> IF(LOCATE(\'unsigned\', COLUMN_TYPE) > 0, 0, 1)\n       ) AS auto_increment_ratio\n  FROM INFORMATION_SCHEMA.COLUMNS\n INNER JOIN INFORMATION_SCHEMA.TABLES USING (TABLE_SCHEMA, TABLE_NAME)\n WHERE TABLE_SCHEMA NOT IN (\'mysql\', \'sys\', \'INFORMATION_SCHEMA\', \'performance_schema\')\n   AND TABLE_TYPE=\'BASE TABLE\'\n   AND EXTRA=\'auto_increment\'\n ORDER BY auto_increment_ratio DESC, max_value;
client_cs_name=utf8mb3
connection_cl_name=utf8mb3_general_ci
view_body_utf8=select `information_schema`.`columns`.`TABLE_SCHEMA` AS `table_schema`,`information_schema`.`columns`.`TABLE_NAME` AS `table_name`,`information_schema`.`columns`.`COLUMN_NAME` AS `column_name`,`information_schema`.`columns`.`DATA_TYPE` AS `data_type`,`information_schema`.`columns`.`COLUMN_TYPE` AS `column_type`,locate(\'unsigned\',`information_schema`.`columns`.`COLUMN_TYPE`) = 0 AS `is_signed`,locate(\'unsigned\',`information_schema`.`columns`.`COLUMN_TYPE`) > 0 AS `is_unsigned`,case `information_schema`.`columns`.`DATA_TYPE` when \'tinyint\' then 255 when \'smallint\' then 65535 when \'mediumint\' then 16777215 when \'int\' then 4294967295 when \'bigint\' then 18446744073709551615 end >> if(locate(\'unsigned\',`information_schema`.`columns`.`COLUMN_TYPE`) > 0,0,1) AS `max_value`,`information_schema`.`tables`.`AUTO_INCREMENT` AS `auto_increment`,`information_schema`.`tables`.`AUTO_INCREMENT` / (case `information_schema`.`columns`.`DATA_TYPE` when \'tinyint\' then 255 when \'smallint\' then 65535 when \'mediumint\' then 16777215 when \'int\' then 4294967295 when \'bigint\' then 18446744073709551615 end >> if(locate(\'unsigned\',`information_schema`.`columns`.`COLUMN_TYPE`) > 0,0,1)) AS `auto_increment_ratio` from (`information_schema`.`columns` join `information_schema`.`tables` on(`information_schema`.`columns`.`TABLE_SCHEMA` = `information_schema`.`tables`.`TABLE_SCHEMA` and `information_schema`.`columns`.`TABLE_NAME` = `information_schema`.`tables`.`TABLE_NAME`)) where `information_schema`.`columns`.`TABLE_SCHEMA` not in (\'mysql\',\'sys\',\'INFORMATION_SCHEMA\',\'performance_schema\') and `information_schema`.`tables`.`TABLE_TYPE` = \'BASE TABLE\' and `information_schema`.`columns`.`EXTRA` = \'auto_increment\' order by `information_schema`.`tables`.`AUTO_INCREMENT` / (case `information_schema`.`columns`.`DATA_TYPE` when \'tinyint\' then 255 when \'smallint\' then 65535 when \'mediumint\' then 16777215 when \'int\' then 4294967295 when \'bigint\' then 18446744073709551615 end >> if(locate(\'unsigned\',`information_schema`.`columns`.`COLUMN_TYPE`) > 0,0,1)) desc,case `information_schema`.`columns`.`DATA_TYPE` when \'tinyint\' then 255 when \'smallint\' then 65535 when \'mediumint\' then 16777215 when \'int\' then 4294967295 when \'bigint\' then 18446744073709551615 end >> if(locate(\'unsigned\',`information_schema`.`columns`.`COLUMN_TYPE`) > 0,0,1)
mariadb-version=100617
