export default function ProfileDetails(props){
    return (
        <form>
            <div className="form-group">
                <label>Email</label>
                <input value = "mojemail@gmail.com" className="form-control" />
            </div>
            <div className="form-group">
                <label>Hasło</label>
                <input placeholder="*******" className="form-control" />
            </div>
            <button className="btn btn-primary">Zapisz</button>
        </form>
    );
}