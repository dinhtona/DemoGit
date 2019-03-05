function getParamsFromURL(){
    var params= window.location.search.substr(1,).split('=');
    
    var courseId=params[1];
    // console.log(courseId);
    return courseId;
}

//getParamsFromURL();


function getChitietKhoahoc(){
    $.ajax({
        url:`http://sv.myclass.vn/api/QuanLyTrungTam/ChiTietKhoaHoc/${getParamsFromURL()}`,
        type: 'GET'
    }).done(function(result){
        console.log(result);
        
        renderCourseDetail(result);
    }).fail(function(err){
        console.log(err);
    })
}

getChitietKhoahoc();

function renderCourseDetail(chitietKhoaHoc){
    var content=`
        <div class="container justify-content-center">
            
            <img src="${chitietKhoaHoc.HinhAnh}" alt="" style="height:300px">
            <h1>${chitietKhoaHoc.TenKhoaHoc}</h1>
            <p>Mô tả: ${chitietKhoaHoc.MoTa}</p>
            <p>Giảng viên: ${chitietKhoaHoc.NguoiTao}</p>
            
        </div>
    </div>`;
    
    $('.chitietKhoahoc').html(content);
}

