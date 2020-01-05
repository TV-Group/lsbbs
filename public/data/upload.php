<?php
	//1:创建变量保存上传目录
   $file_path="./uploads/";
   $file_up=$file_path.basename($_FILES["upload"]["name"]);
   $t=$_FILES["upload"]["tmp_name"];
   if(move_uploaded_file($t,$file_up)){
      echo "success";
   }else{
      echo "fail";
   }
?>