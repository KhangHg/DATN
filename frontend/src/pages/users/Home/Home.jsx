import classNames from "classnames/bind";
import styles from "./Home.module.scss"

const cx = classNames.bind(styles);

const Home = () => {
    return (
        <div>




<div class="wrapper">
    <div class="header">
      <div class="header-box">
        <div class="logos">
          <div class="logo-right">

            <div class="name">
              <p>Xin chào</p>
              <p>Nguyễn Thị Quỳnh Nga</p>

            </div>
          </div>
        </div>
        <div class="nav">
          <div class="nav-item"><a href="">TRANG CHỦ</a></div>
          <div class="nav-item">
            <a href="">NGOẠI KHÓA</a>
            <div class="nav-list">
              <ul>
                <li><a href=""><i class="fas fa-solid fa-list"></i> 10000 bước chạy</a></li>
                <li><a href=""><i class="fas fa-solid fa-list"></i> Sự kiện</a></li>
                <li><a href=""><i class="fas fa-solid fa-list"></i> Hoạt động</a></li>
                <li><a href=""><i class="fas fa-solid fa-list"></i> Tổ chức</a></li>
                <li><a href=""><i class="fas fa-solid fa-list"></i> Câu lạc bộ</a></li>
                <li><a href=""><i class="fas fa-solid fa-list"></i> Kế hoạch</a></li>
              </ul>
            </div>
          </div>
          <div class="nav-item"><a href="">HƯỚNG NGHIỆP</a>
          </div>
          <div class="nav-item"><a href="">HỌC BỔNG</a>
          </div>
          <div class="nav-item"><a href="">CHẤM ĐIỂM</a>
          </div>
          <div class="nav-item"><a href="">HÀNH CHÍNH</a>
          </div>
          <div class="nav-item"><a href="">Q&A</a>
          </div>
          <div class="nav-item"><a href="">HÒ SƠ</a>
          </div>
          <div class="nav-item"><a href="">NHẬP HỌC</a>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="content-box">
        <div class="infor-nga-left">
          <div class="infor-top">
            <div class="infor-top-img">
              <img class="img-banner"
                src="https://dean2020.edu.vn/wp-content/uploads/2019/06/hinh-6.png?fbclid=IwAR0lglhr6oJ5eQSRpGiweKiOS5ufU-k5ZFFVUu3MSm247pY_DVaq9Ef6m58"
                alt=""/>
              <img class="img-ava" src="./avatar.jpg" alt=""/>
            </div>
            <div class="info-top-char">
              MS: 20205107 <br />
              Họ tên: Nguyễn Thị Quỳnh Nga <br />
              Lớp: Việt Nhật 05-K65 <br />
              Email: nga.ntq205107@sis.hust.edu.vn <br />
              Email cá nhân: kalixyanua2002hh4@gmail.com <br />
            </div>
          </div>
          <div class="infor-bottom">
            <div class="infor-bottom-name">
              <button class="list-item active" onclick="openTab(event, 'sinh-vien')">Sinh viên</button>
              <button class="list-item" onclick="openTab(event, 'giao-vien')">Giáo viên chủ nhiệm</button>
            </div>
            <div class="infor-bottom-main">
              <div id="sinh-vien" class="list-content">
                <p >Trạng thái học tập: Học</p>
                <p >CPA: 0.00</p>
                <p >Nợ: 0 TC</p>
                <p >Tích lũy: 0 TC</p>
                <p >Mức cảnh cáo: M0</p>
                <p >Trình độ: 0</p>
              </div>
              <div id="giao-vien" class="list-content">
                <p >GVCN: nga.nguyenthithanh@hust.edu.vn</p>
                <p >Trường Công nghệ Thông tin và Truyền thông</p>
              </div>
            </div>
            <div class="infor-bottom-list"></div>
          </div>
        </div>
        <div class="infor-nga-rigth">
          <div class="info1">
            <div class="list">
              <button class="list-item-2 active" onclick="openTab2(event, 'ly-lich')">Lý lịch</button>
              <button class="list-item-2" onclick="openTab2(event, 'quyet-dinh')">Quyết Định</button>
              <button class="list-item-2" onclick="openTab2(event, 'khen-thuong')">Khen Thưởng</button>
              <button class="list-item-2" onclick="openTab2(event, 'lien-he')">Liên Hệ</button>
              <button class="list-item-2" onclick="openTab2(event, 'nhan-xet')">Nhận Xét</button>
              <button class="list-item-2" onclick="openTab2(event, 'hoat-dong')">Hoạt động tham gia</button>
            </div>
            <div id="ly-lich" class="list-content-2">
              <h4>
                Thông tin cá nhân
              </h4>
              <div class="chia-column-3">
                <div>

                  <p class="minwidth" >
                    Ngày sinh: 20/02/2002
                  </p>
                  <p class="minwidth" >
                    Số CMTND: 038302012350
                  </p>
                  <p class="minwidth" >
                    Dân tộc: KHÔNG
                  </p>
                  <p class="minwidth" >
                    Ngày vào Đoàn: 02/09/2002
                  </p>
                </div>
                <div>
                  <p class="minwidth" >
                    Nơi sinh: Thanh Hóa
                  </p>
                  <p class="minwidth" >
                    Nơi cấp: THANH HÓA
                  </p>
                  <p class="minwidth" >
                    Tôn giáo: KHÔNG
                  </p>
                  <p class="minwidth" >
                    Ngày vào Đảng:
                  </p>
                </div>
                <div>
                  <p class="minwidth" >
                    Giới tính: Nữ
                  </p>
                  <p class="minwidth" >
                    Ngày cấp:
                  </p>
                  <p class="minwidth" >
                    Chi đoàn: Việt Nhật 05 K65
                  </p>
                  <p class="minwidth" >
                    Đoàn viên
                  </p>
                </div>
              </div>
              <p >Đối tượng chính sách:</p>
              <p >Số thẻ bảo hiểm:</p>
              <p >
                Địa chỉ thường trú: XÃ HOẰNG CHÂU, HUYỆN HOẰNG HÓA, TỈNH THANH HÓA
              </p>
              <p >
                Nơi ở hiện tại: Ngõ 488 Bạch Mai Hà Nội Việt Nam
              </p>
              <h4 >
                Thông tin gia đình
              </h4>
              <p>
                Họ và tên cha:
              </p>
              <div class="chia-column-3">
                <div>
                  <p class="minwidth" >Dân tộc</p>
                  <p class="minwidth" >Nơi làm việc</p>
                </div>
                <div>
                  <p class="minwidth" >Năm sinh:</p>
                  <p class="minwidth" >Tôn giáo:</p>
                </div>
                <div>
                  <p class="minwidth" >Quốc tịch:</p>
                  <p class="minwidth" >Nghề nghiệp:</p>
                </div>
              </div>
              <p class="minwidth" >Nơi sinh:</p>

              <p class="minwidth" >
                Địa chỉ thường trú:
              </p>
              <p class="minwidth" >Liên hệ:</p>
              <p >
                Họ và tên mẹ :
              </p>
              <div class="chia-column-3">
                <div>
                  <p class="minwidth" >Dân tộc</p>
                  <p class="minwidth" >Nơi làm việc</p>
                </div>
                <div>
                  <p class="minwidth" >Năm sinh:</p>
                  <p class="minwidth" >Tôn giáo:</p>
                </div>
                <div>
                  <p class="minwidth" >Quốc tịch:</p>
                  <p class="minwidth" >Nghề nghiệp:</p>
                </div>
              </div>
              <p class="minwidth" >Nơi sinh:</p>

              <p class="minwidth" >
                Địa chỉ thường trú:
              </p>
              <p class="minwidth" >Liên hệ:</p>
              <p >
                Thông tin người thân khác:
              </p>
              <div class="chia-column-2">
                <p  class="minwidth">
                  Thuộc hộ:
                </p>
                <p  class="minwidth">
                  Số sổ:
                </p>
              </div>
            </div>
          </div>

        </div>


      </div>
      <div class="chart-nga">
        <div class="chart-1">
          <h4>Biểu đồ học tập</h4>
          <div>
            <img src="./chart-1.png" alt=""/>
          </div>
        </div>
        <div class="chart-2">
          <h4>Biểu đồ rèn luyện</h4>
          <div>
            <img src="./chart-2.png" alt=""/>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="foot-content">
        <h1>BAN CÔNG TÁC SINH VIÊN</h1>
        <p>Địa chỉ: P101, 102, 103, 104, 105 nhà C1</p>
        <p>Email: ctsv@hust.edu.vn - Tel: +84(0)24 3869 3108</p>
        <div class="ictsv">
          <img src="https://ctsv.hust.edu.vn/static/img/logo-app.ab821ed0.png" alt=""/>
          <p>Cài đặt ứng dụng iCTSV trên điện thoại</p>
        </div>
        <div >
          <img src="img1.png" alt=""/>
          <img src="img2.png" alt=""/>
        </div>
      </div>
    </div>

  </div>


            
        </div>
    )
}

export default Home;