var courseList=[];
var layKhoahoc= function(){
    // console.log('Đã vô tới hàm');
    $.ajax({
        url:`http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachKhoaHoc`,
        type:'GET'
    }).done(function(res){
        courseList=res;
        console.log(res);
        renderCourseItem();
    }).fail(function(err){
        console.log(err);
    })
}

layKhoahoc();

var renderCourseItem = function(){
    var content=[];
    for (var i=0;i<courseList.length;i++){
        content+=`
        <div class="col-3">
            <div class="card mb-3">
                <img src="${courseList[i].HinhAnh}" alt="" style="height:300px">
                <p>${courseList[i].TenKhoaHoc}</p>
                <p>Người tạo: ${courseList[i].NguoiTao}</p>
                <a href="ChitietKhoaHoc.html?makhoahoc=${courseList[i].MaKhoaHoc}" class="btn btn-success btnXemChitiet">Xem chi tiết</a>
            </div>
        </div>`
    }
    $('#danhSachKhoaHoc').html(content);//Chỗ này giống như innerHTML
}


//Cách 2 chuyển trang trong Jquery
// $('body').delegate('.btnXemChiTiet','click', function(){
//     window.location.assign('ChitietKhoaHoc.html?makhoahoc'+maKhoaHoc);
// })
// $('body').delegate('.btnLaykhoahoc','click',layKhoahoc);