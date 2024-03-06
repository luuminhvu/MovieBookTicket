import { Link } from "react-router-dom";
import poster1 from "../../assets/images/poster1.jpg";
import StarFill from "../../components/icons/StarFill";
import StarNoFill from "../../components/icons/StarNoFill";
import FacebookIconPlus from "../../components/icons/FacebookPlus";
import Twitter from "../../components/icons/Twitter";
import Message from "../../components/icons/Message";
const Detail = () => {
  return (
    <>
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container py-24 mx-auto">
          <div className="lg:w-full flex flex-wrap sm: px-5">
            <div className="lg:w-1/3 w-full md:w-1/3 sm:w-full sm:mb-10 lg:mb-0">
              <img
                alt="ecommerce"
                className="object-cover object-center rounded-2xl lg:w-3/4 w-full h-auto mx-auto"
                src={poster1}
              />
            </div>

            <div className="lg:w-2/3 w-full lg:pl-0 lg:py-2 md:w-2/3 md:pl-10 md:py-6 sm:w-full sm:pl-0 sm:py-6">
              <h1 className="text-gray-900 text-4xl title-font font-medium mb-1">
                Mai
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <StarFill />
                  <StarFill />
                  <StarFill />
                  <StarFill />
                  <StarNoFill />
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                  <Link className="text-gray-500">
                    <FacebookIconPlus />
                  </Link>
                  <Link className="ml-2 text-gray-500">
                    <Twitter />
                  </Link>
                  <Link className="ml-2 text-gray-500">
                    <Message />
                  </Link>
                </span>
              </div>
              <p className="leading-relaxed text-xl">
                MAI xoay quanh câu chuyện về cuộc đời của một người phụ nữ cùng
                tên với bộ phim. Trên First-look Poster, Phương Anh Đào tạo ấn
                tượng mạnh với cái nhìn tĩnh lặng, xuyên thấu, đặc biệt, trên bờ
                môi nữ diễn viên là hình ảnh cô đang nằm nghiêng trên mặt nước.
                Được phủ một màn sương mờ ảo, poster đậm chất nghệ thuật của Mai
                gây tò mò với lời tựa: “Quá khứ chưa ngủ yên, ngày mai liệu sẽ
                đến?”.
              </p>
              <div className="mt-6 pb-5 border-b-2 border-gray-200 mb-5">
                <div className="lg:flex lg:flex-row lg:items-center lg:py-1 lg:text-lg md:flex md:flex-row md:items-center md:py-1 md:text-lg sm:flex sm:flex-row sm:items-start sm:py-1 sm:text-sm">
                  <div className="lg:w-2/5 md:w-2/5 sm:w-2/5">
                    <span className="font-bold uppercase">ĐẠO DIỄN :</span>
                  </div>
                  <div className="lg:w-4/5 md:w-3/5 sm:w-4/5">
                    <span>Trấn Thành</span>
                  </div>
                </div>
                <div className="lg:flex lg:flex-row lg:items-center lg:py-1 lg:text-lg md:flex md:flex-row md:items-center md:py-1 md:text-lg sm:flex sm:flex-row sm:items-start sm:py-1 sm:text-sm">
                  <div className="lg:w-2/5 md:w-2/5 sm:w-2/5">
                    <span className="font-bold uppercase">Thời lượng :</span>
                  </div>
                  <div className="lg:w-4/5 md:w-3/5 sm:w-4/5">
                    <span>100 phút</span>
                  </div>
                </div>
                <div className="lg:flex lg:flex-row lg:items-center lg:py-1 lg:text-lg md:flex md:flex-row md:items-center md:py-1 md:text-lg sm:flex sm:flex-row sm:items-start sm:py-1 sm:text-sm">
                  <div className="lg:w-2/5 md:w-2/5 sm:w-2/5">
                    <span className="font-bold uppercase">Thể loại :</span>
                  </div>
                  <div className="lg:w-4/5 md:w-3/5 sm:w-4/5">
                    <span>Tâm lý, tình cảm</span>
                  </div>
                </div>
                <div className="lg:flex lg:flex-row lg:items-center lg:py-1 lg:text-lg md:flex md:flex-row md:items-center md:py-1 md:text-lg sm:flex sm:flex-row sm:items-start sm:py-1 sm:text-sm">
                  <div className="lg:w-2/5 md:w-2/5 sm:w-2/5">
                    <span className="font-bold uppercase">Diễn Viên :</span>
                  </div>
                  <div className="lg:w-4/5 md:w-3/5 sm:w-4/5">
                    <span>
                      Phương Anh Đào, Tuấn Trần, Trấn Thành, Hồng Đào, Uyển Ân,
                      Ngọc Giàu, Việt Anh, Quỳnh Anh, Anh Thư,..
                    </span>
                  </div>
                </div>
                <div className="lg:flex lg:flex-row lg:items-center lg:py-1 lg:text-lg md:flex md:flex-row md:items-center md:py-1 md:text-lg sm:flex sm:flex-row sm:items-start sm:py-1 sm:text-sm">
                  <div className="lg:w-2/5 md:w-2/5 sm:w-2/5">
                    <span className="font-bold uppercase">Ngôn ngữ :</span>
                  </div>
                  <div className="lg:w-4/5 md:w-3/5 sm:w-4/5">
                    <span>Tiếng Việt</span>
                  </div>
                </div>
                <div className="lg:flex lg:flex-row lg:items-center lg:py-1 lg:text-lg md:flex md:flex-row md:items-center md:py-1 md:text-lg sm:flex sm:flex-row sm:items-start sm:py-1 sm:text-sm">
                  <div className="lg:w-2/5 md:w-2/5 sm:w-2/5">
                    <span className="font-bold uppercase">
                      Ngày khởi chiếu :
                    </span>
                  </div>
                  <div className="lg:w-4/5 md:w-3/5 sm:w-4/5">
                    <span>20/10/2021</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Detail;
