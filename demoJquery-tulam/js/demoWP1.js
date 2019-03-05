import './demoWP2';//import hết 1 trang và chạy tuốt 

import {ThongBao, ThongBao3} from './demoWP3'; 
//Import {cái vẹo gì đó} được export từ file './demoWP3' : ThongBao là một hàm trong file demoWP3
//=> Đồng thời chạy luôn tất cả các file trong demoWP3
import {NhanVien} from '../models/nhanvien';

import {KhoaHoc2} from '../models/khoahoc2';

//import CSS
import '../css/demo.css'; //Nếu k phải js thì phải có Đuôi kiểu file

// import SCSS
import '../scss/demo.scss';

console.log('demoWP1');

ThongBao(); 
ThongBao3();

var nhanvien= new NhanVien('TONA',99);
console.log(nhanvien);

var khoahoc2= new KhoaHoc2('JQuery','Khóa học lập trình JQuery !');
console.log(khoahoc2);