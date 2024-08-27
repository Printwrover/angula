import '/public/css/bootstrap.min.css';
import '/public/css/style.css';
import '/public/js/main.js'

function PackageStart(){
    return(
        <>
        <div className="container-xxl py-5">
  <div className="container">
    <div
      className="text-center wow fadeInUp"
      data-wow-delay="0.1s"
    >
      <h6 className="section-title bg-white text-center text-primary px-3">
        Packages
      </h6>
      <h1 className="mb-5">
        Awesome Packages
      </h1>
    </div>
    <div className="row g-4 justify-content-center">
      <div
        className="col-lg-4 col-md-6 wow fadeInUp"
        data-wow-delay="0.1s"
      >
        <div className="package-item">
          <div className="overflow-hidden">
            <img
              alt=""
              className="img-fluid"
              src="img/package-1.jpg"
            />
          </div>
          <div className="d-flex border-bottom">
            <small className="flex-fill text-center border-end py-2">
              <i className="fa fa-map-marker-alt text-primary me-2" />
              Thailand
            </small>
            <small className="flex-fill text-center border-end py-2">
              <i className="fa fa-calendar-alt text-primary me-2" />
              3 days
            </small>
            <small className="flex-fill text-center py-2">
              <i className="fa fa-user text-primary me-2" />
              2 Person
            </small>
          </div>
          <div className="text-center p-4">
            <h3 className="mb-0">
              $149.00
            </h3>
            <div className="mb-3">
              <small className="fa fa-star text-primary" />
              <small className="fa fa-star text-primary" />
              <small className="fa fa-star text-primary" />
              <small className="fa fa-star text-primary" />
              <small className="fa fa-star text-primary" />
            </div>
            <p>
              Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam eos
            </p>
            <div className="d-flex justify-content-center mb-2">
              <a
                className="btn btn-sm btn-primary px-3 border-end"
                href="#"
                style={{
                  borderRadius: '30px 0 0 30px'
                }}
              >
                Read More
              </a>
              <a
                className="btn btn-sm btn-primary px-3"
                href="#"
                style={{
                  borderRadius: '0 30px 30px 0'
                }}
              >
                Book Now
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        className="col-lg-4 col-md-6 wow fadeInUp"
        data-wow-delay="0.3s"
      >
        <div className="package-item">
          <div className="overflow-hidden">
            <img
              alt=""
              className="img-fluid"
              src="img/package-2.jpg"
            />
          </div>
          <div className="d-flex border-bottom">
            <small className="flex-fill text-center border-end py-2">
              <i className="fa fa-map-marker-alt text-primary me-2" />
              Indonesia
            </small>
            <small className="flex-fill text-center border-end py-2">
              <i className="fa fa-calendar-alt text-primary me-2" />
              3 days
            </small>
            <small className="flex-fill text-center py-2">
              <i className="fa fa-user text-primary me-2" />
              2 Person
            </small>
          </div>
          <div className="text-center p-4">
            <h3 className="mb-0">
              $139.00
            </h3>
            <div className="mb-3">
              <small className="fa fa-star text-primary" />
              <small className="fa fa-star text-primary" />
              <small className="fa fa-star text-primary" />
              <small className="fa fa-star text-primary" />
              <small className="fa fa-star text-primary" />
            </div>
            <p>
              Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam eos
            </p>
            <div className="d-flex justify-content-center mb-2">
              <a
                className="btn btn-sm btn-primary px-3 border-end"
                href="#"
                style={{
                  borderRadius: '30px 0 0 30px'
                }}
              >
                Read More
              </a>
              <a
                className="btn btn-sm btn-primary px-3"
                href="#"
                style={{
                  borderRadius: '0 30px 30px 0'
                }}
              >
                Book Now
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        className="col-lg-4 col-md-6 wow fadeInUp"
        data-wow-delay="0.5s"
      >
        <div className="package-item">
          <div className="overflow-hidden">
            <img
              alt=""
              className="img-fluid"
              src="img/package-3.jpg"
            />
          </div>
          <div className="d-flex border-bottom">
            <small className="flex-fill text-center border-end py-2">
              <i className="fa fa-map-marker-alt text-primary me-2" />
              Malaysia
            </small>
            <small className="flex-fill text-center border-end py-2">
              <i className="fa fa-calendar-alt text-primary me-2" />
              3 days
            </small>
            <small className="flex-fill text-center py-2">
              <i className="fa fa-user text-primary me-2" />
              2 Person
            </small>
          </div>
          <div className="text-center p-4">
            <h3 className="mb-0">
              $189.00
            </h3>
            <div className="mb-3">
              <small className="fa fa-star text-primary" />
              <small className="fa fa-star text-primary" />
              <small className="fa fa-star text-primary" />
              <small className="fa fa-star text-primary" />
              <small className="fa fa-star text-primary" />
            </div>
            <p>
              Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam eos
            </p>
            <div className="d-flex justify-content-center mb-2">
              <a
                className="btn btn-sm btn-primary px-3 border-end"
                href="#"
                style={{
                  borderRadius: '30px 0 0 30px'
                }}
              >
                Read More
              </a>
              <a
                className="btn btn-sm btn-primary px-3"
                href="#"
                style={{
                  borderRadius: '0 30px 30px 0'
                }}
              >
                Book Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
        </>
    )
}
export default PackageStart;