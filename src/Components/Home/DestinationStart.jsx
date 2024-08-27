import '/public/css/bootstrap.min.css';
import '/public/css/style.css';
import '/public/js/main.js';

function DestinationStart () {
    return(
        <>
        <div className="container-xxl py-5 destination">
  <div className="container">
    <div
      className="text-center wow fadeInUp"
      data-wow-delay="0.1s"
    >
      <h6 className="section-title bg-white text-center text-primary px-3">
        Destination
      </h6>
      <h1 className="mb-5">
        Popular Destination
      </h1>
    </div>
    <div className="row g-3">
      <div className="col-lg-7 col-md-6">
        <div className="row g-3">
          <div
            className="col-lg-12 col-md-12 wow zoomIn"
            data-wow-delay="0.1s"
          >
            <a
              className="position-relative d-block overflow-hidden"
              href=""
            >
              <img
                alt=""
                className="img-fluid"
                src="img/set1.jpg"
              />
              <div className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2">
                30% OFF
              </div>
              <div className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">
                Thailand
              </div>
            </a>
          </div>
          <div
            className="col-lg-6 col-md-12 wow zoomIn"
            data-wow-delay="0.3s"
          >
            <a
              className="position-relative d-block overflow-hidden"
              href=""
            >
              <img
                alt=""
                className="img-fluid"
                src="img/moto1.jpg"
              />
              <div className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2">
                25% OFF
              </div>
              <div className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">
                Malaysia
              </div>
            </a>
          </div>
          <div
            className="col-lg-6 col-md-12 wow zoomIn"
            data-wow-delay="0.5s"
          >
            <a
              className="position-relative d-block overflow-hidden"
              href=""
            >
              <img
                alt=""
                className="img-fluid"
                src="img/moto.jpg"
              />
              <div className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2">
                35% OFF
              </div>
              <div className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">
                Australia
              </div>
            </a>
          </div>
        </div>
      </div>
      <div
        className="col-lg-5 col-md-6 wow zoomIn"
        data-wow-delay="0.7s"
        style={{
          minHeight: '350px'
        }}
      >
        <a
          className="position-relative d-block h-100 overflow-hidden"
          href=""
        >
          <img
            alt=""
            className="img-fluid position-absolute w-100 h-100"
            src="img/botster.jpg"
            style={{
              objectFit: 'cover'
            }}
          />
          <div className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2">
            20% OFF
          </div>
          <div className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">
            Indonesia
          </div>
        </a>
      </div>
    </div>
  </div>
</div>
        </>
    )
}
export default DestinationStart;