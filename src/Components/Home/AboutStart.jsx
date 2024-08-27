import '/public/css/bootstrap.min.css';
import '/public/css/style.css';
import '/public/js/main.js'

function AboutStart (){
    return(
        <>
        <div className="container-xxl py-5">
  <div className="container">
    <div className="row g-5">
      <div
        className="col-lg-6 wow fadeInUp"
        data-wow-delay="0.1s"
        style={{
          minHeight: '400px'
        }}
      >
        <div className="position-relative h-100">
          <img
            alt=""
            className="img-fluid position-absolute w-100 h-100"
            src="img/logodetail.jpg"
            style={{
              objectFit: 'cover'
            }}
          />
        </div>
      </div>
      <div
        className="col-lg-6 wow fadeInUp"
        data-wow-delay="0.3s"
      >
        <h6 className="section-title bg-white text-start text-primary pe-3">
          About Us
        </h6>
        <h1 className="mb-4">
          Welcome to{' '}
          <span className="text-primary">
            Carteam
          </span>
        </h1>
        <p className="mb-4">
          Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit.
        </p>
        <p className="mb-4">
          Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet
        </p>
        <div className="row gy-2 gx-4 mb-4">
          <div className="col-sm-6">
            <p className="mb-0">
              <i className="fa fa-arrow-right text-primary me-2" />
              First Class Flights
            </p>
          </div>
          <div className="col-sm-6">
            <p className="mb-0">
              <i className="fa fa-arrow-right text-primary me-2" />
              Handpicked Hotels
            </p>
          </div>
          <div className="col-sm-6">
            <p className="mb-0">
              <i className="fa fa-arrow-right text-primary me-2" />
              5 Star Accommodations
            </p>
          </div>
          <div className="col-sm-6">
            <p className="mb-0">
              <i className="fa fa-arrow-right text-primary me-2" />
              Latest Model Vehicles
            </p>
          </div>
          <div className="col-sm-6">
            <p className="mb-0">
              <i className="fa fa-arrow-right text-primary me-2" />
              150 Premium City Tours
            </p>
          </div>
          <div className="col-sm-6">
            <p className="mb-0">
              <i className="fa fa-arrow-right text-primary me-2" />
              24/7 Service
            </p>
          </div>
        </div>
        <a
          className="btn btn-primary py-3 px-5 mt-2"
          href=""
        >
          Read More
        </a>
      </div>
    </div>
  </div>
</div>
        </>
    )
}
export default AboutStart;