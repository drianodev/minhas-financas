function SelectMenu({ lista, id, label, change, name = '', value }) {


    return (
        <>
            <div className="form-group">
                <label className="col-form-label" htmlFor={id}>{label}</label>
                <select id={id} className="form-select" onChange={change} name={name} value={value}>  

                    {lista.map((option) =>(
                        <option key={option.value} value={option.value} >
                            {option.label}
                        </option>

                    ))}
                </select>
            </div>

        </>
    );
}

export default SelectMenu;