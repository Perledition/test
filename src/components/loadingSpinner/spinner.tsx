import './spinner.css';

interface Props {
  showSpinnerClass: string;
}

export default function CardSpinner({showSpinnerClass}: Props) {
    return (
      <div className={showSpinnerClass}>
        <div className="card-spinner">
          <div className="card">
            <div className="card-inner">
              <div className="flash-animation">
                Lädt
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };