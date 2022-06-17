const OneWorker = (props) => {
    return (
        <>
            <tr>
                <td>{props.worker.firstName}</td>
                <td>{props.worker.lastName}</td>
                <td>{props.worker.department}</td>
                <td>{props.worker.salary} {props.worker.currency}</td>
                <td><button onClick={()=>props.delete(props.worker.id)} className='ButtonX'>x</button></td>
            </tr>
        </>
    );
}
 
export default OneWorker;



