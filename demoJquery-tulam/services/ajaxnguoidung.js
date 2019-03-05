//Thực hiện tách các ajax lien quan toi ngooi dung vo day

// Đây là một lớp đối tượng riêng làm nhiệm vụ lưu các AjaxNguoiDung

function AjaxNguoiDung(){
    this.ajaxGetUserList=function(){
        return $.ajax({
            url: 'http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung',
            type: 'GET'
        });
    }

    this.ajaxDeleteUser=function(taiKhoan){
        return $.ajax ({
            // cách 1: url: 'http://sv.myclass.vn/api/QuanLyTrungTam/XoaNguoiDung/' + taiKhoan;
            url: `http://sv.myclass.vn/api/QuanLyTrungTam/XoaNguoiDung/${taiKhoan}`,
            type: 'DELETE'
        });
    }

    this.ajaxAddUser=function(NguoiDungMoi){
        return $.ajax({
            url: "http://sv.myclass.vn/api/QuanLyTrungTam/ThemNguoiDung",
            type: 'POST',
            data: NguoiDungMoi
        });
    }

    this.ajaxUpdateUser= function(nguoiDung){
        return $.ajax ({
            url: 'http://sv.myclass.vn/api/QuanLyTrungTam/CapNhatThongTinNguoiDung',
            type: 'PUT',
            data: nguoiDung
        });
    }
}