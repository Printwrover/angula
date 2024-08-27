import '/public/css/bootstrap.min.css';
import '/public/css/style.css';
import '/public/js/main.js'

function BookingStart (){
    return(
        <>
        <div
  className="container-xxl py-5 wow fadeInUp"
  data-wow-delay="0.1s"
>
  <div className="container">
    <div className="booking p-5">
      <div className="row g-5 align-items-center">
        <div className="col-md-6 text-white">
          <h6 className="text-white text-uppercase">
            Booking
          </h6>
          <h1 className="text-white mb-4">
            Online Booking
          </h1>
          <p className="mb-4">
            Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit.
          </p>
          <p className="mb-4">
            Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet
          </p>
          <a
            className="btn btn-outline-light py-3 px-5 mt-2"
            href=""
          >
            Read More
          </a>
        </div>
        <div className="col-md-6">
          <h1 className="text-white mb-4">
            Book A Tour
          </h1>
          <form>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    className="form-control bg-transparent"
                    id="name"
                    placeholder="Your Name"
                    type="text"
                  />
                  <label htmlFor="name">
                    Your Name
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    className="form-control bg-transparent"
                    id="email"
                    placeholder="Your Email"
                    type="email"
                  />
                  <label htmlFor="email">
                    Your Email
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <div
                  className="form-floating date"
                  data-target-input="nearest"
                  id="date3"
                >
                  <input
                    className="form-control bg-transparent datetimepicker-input"
                    data-target="#date3"
                    data-toggle="datetimepicker"
                    id="datetime"
                    placeholder="Date & Time"
                    type="text"
                  />
                  <label htmlFor="datetime">
                    Date & Time
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating">
                  <select
                    className="form-select bg-transparent"
                    id="select1"
                  >
                    <option value="1">
                      Destination 1
                    </option>
                    <option value="2">
                      Destination 2
                    </option>
                    <option value="3">
                      Destination 3
                    </option>
                  </select>
                  <label htmlFor="select1">
                    Destination
                  </label>
                </div>
              </div>
              <div className="col-12">
                <div className="form-floating">
                  <textarea
                    className="form-control bg-transparent"
                    id="message"
                    placeholder="Special Request"
                    style={{
                      height: '100px'
                    }}
                  />
                  <label htmlFor="message">
                    Special Request
                  </label>
                </div>
              </div>
              <div className="col-12">
                <button
                  className="btn btn-outline-light w-100 py-3"
                  type="submit"
                >
                  Book Now
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
        </>
    )
}
export default BookingStart;