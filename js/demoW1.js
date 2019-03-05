//import và chạy tất cả code ở file demoW2.js vào
import './demoW2';

//import và chạy tất cả code ở file demoW3.js
// đồng thời chúng ta có thể gọi hàm thongBao đã export bên demoW3.js để sử dụng tại
// demoW3
import {thongBao ,thongBaoDemo3 } from './demoW3';

import {NhanVien} from '../models/nhanvien'

//import css
import '../css/demo.css';
//import scss 
import '../scss/demo.scss';

console.log('demoW1');

thongBao();
thongBaoDemo3()
console.log('mới thêm cái lệnh watch với -w');

var nhanVienMoi = new NhanVien('hieu',12);
console.log(nhanVienMoi)

