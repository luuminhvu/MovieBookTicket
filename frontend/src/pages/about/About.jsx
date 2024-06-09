const About = () => {
  return (
    <section className="">
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="font-heading mb-4 bg-orange-100 text-blue-800 px-4 py-2 rounded-lg md:w-64 md:mx-auto text-xs font-semibold tracking-widest uppercase title-font">
              Chào mừng đến với BetaCinemars
            </h2>
            <p className="font-heading mt-2 text-3xl leading-8 font-semibold tracking-tight text-gray-900 sm:text-4xl">
              Nâng cao Trải nghiệm Xem Phim Của Bạn
            </p>
            <p className="mt-4 max-w-2xl text-lg text-gray-500 lg:mx-auto">
              Tại BetaCinemars, chúng tôi cam kết mang đến cho bạn những trải
              nghiệm xem phim đáng nhớ. Với cơ sở vật chất hiện đại và một loạt
              các bộ phim, chúng tôi nhằm mục tiêu biến mỗi lần ghé thăm Cinema
              trở nên đặc biệt.
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md text-white">
                    <img
                      alt=""
                      src="https://www.svgrepo.com/show/490878/movie-videos.svg"
                    />
                  </div>
                  <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">
                    Trải nghiệm Xem Phim Độc Đáo
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  BetaCinemars mang đến một trải nghiệm xem phim độc đáo, với cơ
                  sở vật chất hiện đại và một loạt các bộ phim phong phú phù hợp
                  với mọi sở thích của khán giả.
                </dd>
              </div>
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md text-white">
                    <img
                      alt=""
                      src="https://www.svgrepo.com/show/503138/webpack.svg"
                    />
                  </div>
                  <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">
                    Đặt Vé Dễ Dàng
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Quy trình đặt vé của chúng tôi đơn giản và thân thiện với
                  người dùng, cho phép bạn đặt ghế một cách dễ dàng.
                </dd>
              </div>
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md text-white">
                    <img
                      alt=""
                      src="https://www.svgrepo.com/show/471846/sale-03.svg"
                    />
                  </div>
                  <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">
                    Giá Cả Hợp Lý
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  BetaCinemars cam kết cung cấp giá cả cạnh tranh để đảm bảo mọi
                  người có thể thưởng thức phép màu của điện ảnh mà không phải
                  lo lắng về tài chính.
                </dd>
              </div>
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md text-white">
                    <img
                      alt=""
                      src="https://www.svgrepo.com/show/76267/free-commercial-label.svg"
                    />{" "}
                  </div>
                  <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">
                    Môi Trường Thoải Mái
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Hãy thư giãn và tận hưởng không gian xem phim thoải mái của
                  chúng tôi, được thiết kế để tăng cường trải nghiệm xem phim
                  của bạn.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
