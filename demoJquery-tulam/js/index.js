 
var DSND = [];
 
// Chức năng: Hiển thị modal thêm người dùng
// Không thêm hiển thị ngay từ đầu vì sau đó sẽ có update
var HienThiModal = function() {
    // Đổi cái title của modal 
    // html(): get value
    // html("them"): set value
    $('.modal-title').html('Thêm Người Dùng');
 
    var btnGroups =`
        <button class="btn btn-success" id="btnThem">Thêm người dùng</button>
        <button class="btn btn-secondary" data-dismiss="modal">Đóng</button>
    `
    $('.modal-footer').html(btnGroups);
}
 
//--------------------AJAX-------------------
// Sử dụng cái AjaxNguoiDung
var ajaxNguoiDung= new  AjaxNguoiDung();

var getUserListFormDB = function(){
    ajaxNguoiDung.ajaxGetUserList().done(function(res){
        // code chạy khi sever trả về kết quả
        // console.log('Đã chạy vào đây');
        //console.log(res);
        DSND = res;
        taoBang(DSND);  
    }).fail(function(err){
        console.log(err);
    })
 
    
}
getUserListFormDB();
 
var getStudentList = function(){
    $.ajax({
        url: 'http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachHocVien',
        type: 'GET'
    }).done(function(res){
        console.log(res);
    }).fail(function(err){
        console.log(err);
    })
 
    // cybersoft sẽ đc in ra trước vì sự bất đồng bộ asynchonous 
    // console.log("cybersoft");
 
}
getStudentList();
 
// -------------gắn sự kiện---------------
$('#btnThemNguoiDung').click(HienThiModal); 
 
var taoBang = function(danhSach){
    var content = '';
    for(var i = 0; i < danhSach.length; i++){
        // không có id vì this sẽ tạo ra nhiều id sau mỗi lần nhấn
 
        // B2: Sửa lại HienThiModal(tiêu đề, footer);
        content += `
            <tr>
                <td>${i + 1}</td>
                <td>${danhSach[i].TaiKhoan}</td>
                <td>${danhSach[i].MatKhau}</td>
                <td>${danhSach[i].HoTen}</td>
                <td>${danhSach[i].Email}</td>
                <td>${danhSach[i].SoDT}</td>
 
                <td>
                
                    <button class="btn btn-success btnXoa" data-taikhoan="${danhSach[i].TaiKhoan}">Xóa</button>
                    <button 
                        data-taikhoan="${danhSach[i].TaiKhoan}"
                        data-matkhau="${danhSach[i].MatKhau}"
                        data-hoten="${danhSach[i].HoTen}"
                        data-email="${danhSach[i].Email}"
                        data-sodt="${danhSach[i].SoDT}"
                        data-maloainguoidung="${danhSach[i].maLoaiNguoiDung}"
 
                        data-toggle="modal"
                        data-target="#myModal"    
 
                        class="btn btn-info btnCapNhat"
                    
                    >Cập Nhật</button>
                </td>
            </tr>
        `
    }
 
    $('#tblDanhSachNguoiDung').html(content);
}
 
// Chức năng: Thêm Người Dùng
var themNguoiDung = function(){
 
    // hàm val(): vừa get vừa set
    var taiKhoan = $('#TaiKhoan').val();
    var matKhau = $('#MatKhau').val();
    var hoTen = $('#HoTen').val();
    var email = $('#Email').val();
    var soDT = $('#SoDienThoai').val();
    var maLoaiNguoiDung = $('#maLoaiNguoiDung').val();
 
    // Tạo đối tượng người dùng
    var NguoiDungMoi = new NguoiDung(taiKhoan, matKhau, hoTen, email, soDT, maLoaiNguoiDung);
    
    console.log(NguoiDungMoi);
 
    // Gửi lên server: kết nối server, thêm người dùng mới
    ajaxNguoiDung.ajaxAddUser(NguoiDungMoi).done(function(result){
        console.log(result);
        // cách 1:`
        // getUserListFormDB();
        // Cách 2:
        DSND.push(NguoiDungMoi);
        taoBang(DSND);
    }).fail(function(error){
        console.log(error);
    })
    // để đây thì không chắc nó chạy sau cái ajax
    // getUserListFormDB()
 
    // push người dùng vào danh sách
    // DSND.push(NguoiDungMoi);
 
    // Ẩn modal
    $('.close').trigger('click');
 
    // clear input 
    $('.modal-body input').val('');
 
    taoBang(DSND);
}

var xoaNguoiDung = function(){
    //B1: lấy input ra
    //this là cái nút chúng ta nhấn
    var taiKhoan = $(this).attr('data-taikhoan'); 
    
    // var index = timViTriTheoTaiKhoan(DSND, taiKhoan);
    // if (index !== -1) {
        
    //     DSND.splice(index,1);
    //     taoBang(DSND);
    // }
 
    // console.log(taiKhoan);
 
    // 2 dk để chạy đc ajax: live server, jquery
     ajaxNguoiDung.ajaxDeleteUser(taiKhoan).done(function(res){
        console.log(res);
        var index = timViTriTheoTaiKhoan(DSND, taiKhoan);
        if (index !== -1) {
            
            DSND.splice(index,1);
            taoBang(DSND);
        }
 
    }).fail(function(err){
        console.log(err);
    })
 
}
 
var timViTriTheoTaiKhoan = function(danhSach, taiKhoan){
    for(var i = 0; i < danhSach.length; i++){
        if(danhSach[i].TaiKhoan === taiKhoan){
            return i;
        }
    }   
    return -1;
}
 
// CẬP NHẬT THÔNG TIN
// B1: Lấy thông tin người dùng
// B2: Sửa lại HienThiModal(tiêu đề, footer);
// B3: Cập nhật lại thông tin mới
 
var layThongTinND = function(){
    // B1: Lấy thông tin người dùng đang lưu
    var taiKhoan = $(this).attr('data-taikhoan');
    var matKhau = $(this).attr('data-matkhau');
    var hoTen = $(this).attr('data-hoten');
    var Email = $(this).attr('data-email');
    var soDT = $(this).attr('data-sodt');
    var maLoaiNguoiDung = $(this).attr('data-maloainguoidung');
 
    // B2: set giá trị cho input
    $('#TaiKhoan').val(taiKhoan);
    $('#MatKhau').val(matKhau);
    $('#HoTen').val(hoTen);
    $('#Email').val(Email);
    $('#SoDienThoai').val(soDT);
    $('#maLoaiNguoiDung').val(maLoaiNguoiDung);
 
    // B3: gọi hàm Cập nhật lại modal
    CapNhatModal();
}
 
//Hàm hiển thị modal cập nhật người dùng
var CapNhatModal = function(){
    $('.modal-title').html('Cập nhật người dùng');
 
    var btnGroups = `
        <button class="btn btn-success btnCapNhatModal">Cập nhật</button>
        <button class="btn btn-secondary" data-dismiss="modal">Đóng</button>
    `
 
    $('.modal-footer').html(btnGroups);
}
 
// Cập nhật người dùng
var CapNhatNguoiDung = function(){
    var taiKhoan = $('#TaiKhoan').val();
    var matKhau = $('#MatKhau').val();
    var hoTen = $('#HoTen').val();
    var email = $('#Email').val();
    var soDT = $('#SoDienThoai').val();
    var maLoaiNguoiDung = $('#maLoaiNguoiDung').val();
 
    var nguoiDung = new NguoiDung(taiKhoan, matKhau, hoTen, email, soDT, maLoaiNguoiDung);
 
    ajaxNguoiDung.ajaxUpdateUser(nguoiDung).done(function(res){  
        console.log(res);
 
        var index = timViTriTheoTaiKhoan(DSND, taiKhoan);
        if(index !== -1){
            DSND[index] = nguoiDung;
        }
        taoBang(DSND);
 
    }).fail(function(err){
        console.log(err);
    })
 
    
 
    // Ẩn modal
    $('.close').trigger('click');
}



// Đối với các thẻ đc tạo động thông qua sự kiện JS, chúng ta sẽ tạo sự kiểu khác
// 'body': có thể dùng thẻ khác mà bao cả btnThem
$('body').delegate('#btnThem','click',themNguoiDung);
$('body').delegate('.btnXoa','click',xoaNguoiDung);
$('body').delegate('.btnCapNhat','click',layThongTinND);
$('body').delegate('.btnCapNhatModal','click',CapNhatNguoiDung);
 

