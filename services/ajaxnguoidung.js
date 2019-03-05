function AjaxNguoiDung(){
    this.ajaxGetUserList = function(){
        return $.ajax({
            url: 'http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung',
            type: 'GET'
        })
    }
    this.ajaxDeleteUser = function(taiKhoan){
        return $.ajax({
            url: 'http://sv.myclass.vn/api/QuanLyTrungTam/XoaNguoiDung/' + taiKhoan,
            type: 'DELETE'
        })
    }
}