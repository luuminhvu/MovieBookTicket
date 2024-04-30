import React from "react";
import rap1 from "../../assets/images/rap1.jpg";
import rap2 from "../../assets/images/rap2.jpg";
import rap3 from "../../assets/images/rap3.jpg";
import rap4 from "../../assets/images/rap4.jpg";
const Cinema = () => {
  return (
    <>
      <div className="flex items-center justify-center mt-8">
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden lg:flex">
          <div className="lg:w-1/3">
            <img
              className="h-full w-full object-fill object-center rounded-xl"
              src={rap1}
              alt="Rạp chiếu phim"
            />
          </div>

          <div className="lg:w-2/3 p-8">
            <h2 className="text-2xl text-gray-800 font-semibold mb-4">
              Rạp Đống Đa, Hà Nội
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Rạp Đống Đa nằm ở trung tâm Hà Nội, là điểm đến lý tưởng cho những
              người yêu điện ảnh. Với 2 phòng chiếu hiện đại, mỗi phòng có 50
              ghế ngồi, bạn sẽ được trải nghiệm những bộ phim tuyệt vời với chất
              lượng hình ảnh và âm thanh tốt nhất.Hệ thống âm thanh Dolby 7.1 và
              hệ thống cách âm chuẩn quốc tế đảm bảo chất lượng âm thanh sống
              động nhất cho từng thước phim bom tấn.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Giá vé tại Rạp Đống Đa là 50.000 VNĐ cho ghế thường và 55.000 VNĐ
              cho ghế VIP. Để biết thêm thông tin chi tiết và đặt vé, vui lòng
              truy cập trang web của chúng tôi hoặc liên hệ qua hotline dưới
              đây.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Thông tin liên hệ: Địa chỉ: Hà Nội, Việt Nam - Hotline:
              0123.456.789
            </p>
            <a
              href="https://www.example.com/"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-500 inline-flex items-center"
            >
              Xem thêm
              <svg
                className="w-4 h-4 ml-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="currentColor"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm10 8v3H9v-3l3-3 3 3zm-1 5h2v2h-2v-2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mt-8">
        {/* Rạp Cầu Giấy */}
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden lg:flex">
          <div className="lg:w-2/3">
            <img
              className="h-full w-full object-contain object-center rounded-xl"
              src={rap2}
              alt="Rạp chiếu phim"
            />
          </div>

          <div className="lg:w-1/3 p-8">
            <h2 className="text-2xl text-gray-800 font-semibold mb-4">
              Rạp Cầu Giấy, Hà Nội
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Rạp Cầu Giấy nằm ở khu vực trung tâm của quận Cầu Giấy, Hà Nội.
              Với 3 phòng chiếu hiện đại, mỗi phòng có 60 ghế ngồi, bạn sẽ có
              trải nghiệm thú vị với những bộ phim đa dạng và chất lượng.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Giá vé tại Rạp Cầu Giấy là 55.000 VNĐ cho tất cả các ghế. Để biết
              thêm thông tin chi tiết và đặt vé, vui lòng truy cập trang web của
              chúng tôi hoặc liên hệ qua hotline dưới đây.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Thông tin liên hệ: Địa chỉ: Hà Nội, Việt Nam - Hotline:
              0123.456.789
            </p>
            <a
              href="https://www.example.com/"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-500 inline-flex items-center"
            >
              Xem thêm
              <svg
                className="w-4 h-4 ml-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="currentColor"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm10 8v3H9v-3l3-3 3 3zm-1 5h2v2h-2v-2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mt-8">
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden lg:flex">
          <div className="lg:w-2/3 p-8">
            <h2 className="text-2xl text-gray-800 font-semibold mb-4">
              Rạp Mỹ Đình, Hà Nội
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Rạp Mỹ Đình nằm ở khu vực Mỹ Đình, Hà Nội, gần các khu vực dân cư
              đông đúc và các khu trung tâm thương mại lớn. Với 4 phòng chiếu
              hiện đại, mỗi phòng có 70 ghế ngồi, bạn sẽ có trải nghiệm thú vị
              với những bộ phim đa dạng và chất lượng.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Giá vé tại Rạp Mỹ Đình là 60.000 VNĐ cho ghế thường và 65.000 VNĐ
              cho ghế VIP. Để biết thêm thông tin chi tiết và đặt vé, vui lòng
              truy cập trang web của chúng tôi hoặc liên hệ qua hotline dưới
              đây.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Thông tin liên hệ: Địa chỉ: Hà Nội, Việt Nam - Hotline:
              0123.456.789
            </p>
            <a
              href="https://www.example.com/"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-500 inline-flex items-center"
            >
              Xem thêm
              <svg
                className="w-4 h-4 ml-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="currentColor"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm10 8v3H9v-3l3-3 3 3zm-1 5h2v2h-2v-2z" />
              </svg>
            </a>
          </div>
          <div className="lg:w-1/3">
            <img
              className="h-full w-full object-fill object-center rounded-xl"
              src={rap3}
              alt="Rạp chiếu phim"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mt-8 mb-8">
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden lg:flex">
          <div className="lg:w-1/3 p-8">
            <h2 className="text-2xl text-gray-800 font-semibold mb-4">
              Rạp Ba Đình, Hà Nội
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Rạp Ba Đình nằm ở khu vực Ba Đình, Hà Nội, có không gian thoáng
              đãng và yên tĩnh, phù hợp cho những người yêu điện ảnh. Với 2
              phòng chiếu hiện đại, mỗi phòng có 60 ghế ngồi, bạn sẽ có trải
              nghiệm thú vị với những bộ phim đa dạng và chất lượng.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Giá vé tại Rạp Ba Đình là 50.000 VNĐ cho ghế thường và 55.000 VNĐ
              cho ghế VIP. Để biết thêm thông tin chi tiết và đặt vé, vui lòng
              truy cập trang web của chúng tôi hoặc liên hệ qua hotline dưới
              đây.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Thông tin liên hệ: Địa chỉ: Hà Nội, Việt Nam - Hotline:
              0123.456.789
            </p>
            <a
              href="https://www.example.com/"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-500 inline-flex items-center"
            >
              Xem thêm
              <svg
                className="w-4 h-4 ml-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="currentColor"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm10 8v3H9v-3l3-3 3 3zm-1 5h2v2h-2v-2z" />
              </svg>
            </a>
          </div>
          <div className="lg:w-2/3">
            <img
              className="h-full w-full object-fill object-center rounded-xl"
              src={rap4}
              alt="Rạp chiếu phim"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cinema;
