import SwiperCarousel from "../../components/common/Swiper";
import poster1 from "../../assets/images/poster1.jpg";
const Home = () => {
  return (
    <>
      <SwiperCarousel />
      <div className="mt-15">
        <div className="w-screen">
          <h1 className="text-2xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-center border-b-2 w-2/4 mx-auto border-black">
            PHIM ĐANG CHIẾU
          </h1>
        </div>

        <div className="mx-auto sm:w-full md:w-3/4 p-4 sm:p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-5">
          <div className="flex flex-col">
            <img
              src={poster1}
              alt="phim"
              className="rounded-3xl sm:w-full sm:max-w-sm md:max-w-none"
            />
            <h2 className="text-xl mt-2 text-[#337ab7] font-bold">Mai</h2>
            <h2 className="text-sm mt-2 font-bold">
              Thể loại:
              <span className="text-sm font-thin"> Tâm lí, tình cảm</span>
            </h2>
            <h2 className="text-sm mt-2 font-bold">
              Thời lượng:
              <span className="text-sm font-thin"> 100</span>
              <span className="text-sm font-thin"> phút</span>
            </h2>
            <button className="btn btn-primary mt-5 text-white text-tranform: uppercase bg-sky-600 hover:bg-sky-700 p-2 rounded-3xl">
              Mua vé
            </button>
          </div>
          <div className="flex flex-col">
            <img src={poster1} alt="phim" className="rounded-3xl" />
            <h2 className="text-xl mt-2 text-[#337ab7] font-bold">Mai</h2>
            <h2 className="text-sm mt-2 font-bold">
              Thể loại:
              <span className="text-sm font-thin"> Tâm lí, tình cảm</span>
            </h2>
            <h2 className="text-sm mt-2 font-bold">
              Thời lượng:
              <span className="text-sm font-thin"> 100</span>
              <span className="text-sm font-thin"> phút</span>
            </h2>
            <button className="btn btn-primary mt-5 text-white text-tranform: uppercase bg-sky-600 hover:bg-sky-700 p-2 rounded-3xl">
              Mua vé
            </button>
          </div>
          <div className="flex flex-col">
            <img src={poster1} alt="phim" className="rounded-3xl" />
            <h2 className="text-xl mt-2 text-[#337ab7] font-bold">Mai</h2>
            <h2 className="text-sm mt-2 font-bold">
              Thể loại:
              <span className="text-sm font-thin"> Tâm lí, tình cảm</span>
            </h2>
            <h2 className="text-sm mt-2 font-bold">
              Thời lượng:
              <span className="text-sm font-thin"> 100</span>
              <span className="text-sm font-thin"> phút</span>
            </h2>
            <button className="btn btn-primary mt-5 text-white text-tranform: uppercase bg-sky-600 hover:bg-sky-700 p-2 rounded-3xl">
              Mua vé
            </button>
          </div>
          <div className="flex flex-col">
            <img src={poster1} alt="phim" className="rounded-3xl" />
            <h2 className="text-xl mt-2 text-[#337ab7] font-bold">Mai</h2>
            <h2 className="text-sm mt-2 font-bold">
              Thể loại:
              <span className="text-sm font-thin"> Tâm lí, tình cảm</span>
            </h2>
            <h2 className="text-sm mt-2 font-bold">
              Thời lượng:
              <span className="text-sm font-thin"> 100</span>
              <span className="text-sm font-thin"> phút</span>
            </h2>
            <button className="btn btn-primary mt-5 text-white text-tranform: uppercase bg-sky-600 hover:bg-sky-700 p-2 rounded-3xl">
              Mua vé
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
