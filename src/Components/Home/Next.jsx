import '/public/css/bootstrap.min.css';
import '/public/css/style.css';
import '/public/js/main.js'

function Next (){
    return(
        <>
        <div className="row mt-5">
  <div className="col text-center">
    <div className="block-27">
      <ul>
        <li>
          <a href="#">
            {`<`}
          </a>
        </li>
        <li className="active">
          <span>
            1
          </span>
        </li>
        <li>
          <a href="#">
            2
          </a>
        </li>
        <li>
          <a href="#">
            3
          </a>
        </li>
        <li>
          <a href="#">
            4
          </a>
        </li>
        <li>
          <a href="#">
            5
          </a>
        </li>
        <li>
          <a href="#">
            {`>`}
          </a>
        </li>
      </ul>
    </div>
  </div>
</div>
        </>
    )
}
export default Next;