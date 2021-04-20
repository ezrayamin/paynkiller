import React from 'react'
const IsiCart = () => {
    return (
        <div key={index} style={{ backgroundColor: 'white', height: '160px', width: '650px', border: '1px solid gray', margin: '10px 0 0 10px', display: 'flex', flexDirection: 'row', borderRadius: '20px' }}>
                        <div style={{ flexGrow: 3, maxWidth: '30vw', padding: '40px 0 0 30px', display: 'flex', flexDirection: 'row' }}>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/7/73/Pills_and_medicines_02.jpg" style={{ height: '80px', width: '100px' }} />
                            <div>
                                <h1 style={{ fontSize: '15px', fontWeight: 600, margin: '-15px 0 0 20px' }}>{item.nama_produk}</h1>
                                <h1 style={{ fontSize: '15px', fontWeight: 600, margin: '-35px 0 0 20px' }}>Rp {item.harga_produk.toLocaleString()}</h1>
                            </div>
                        </div>
                        <div style={{ flexGrow: 3, maxWidth: '40vw', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ flexGrow: 10 }}>

                            </div>
                            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                <div>
                                    <span style={{ borderLeft: '1px solid gray', height: '25px', alignSelf: 'center', margin: 0 }}></span>
                                    <Button style={{ backgroundColor: 'white', margin: '5px', position: 'initial' }}><span color='gray' className="material-icons">delete</span></Button>
                                </div>

                                <InputGroup style={{ height: '30px', width: '130px', margin: '10px 0 0 20px' }}>
                                    <InputGroup.Button onClick={() => minus(index)}>
                                        <span className="material-icons">remove</span>
                                    </InputGroup.Button>
                                    <Input
                                        type="text"
                                        style={{ color: '#2d5a7e' }}
                                        value={tempQty}
                                        onChange={e => change(e)}
                                    />
                                    <InputGroup.Button onClick={() => plus(index)}>
                                        <span className="material-icons">add</span>
                                    </InputGroup.Button>
                                </InputGroup>
                            </div>
                        </div>
                    </div>
    )
}