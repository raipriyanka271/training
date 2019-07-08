render() {
    const { getFieldDecorator } = this.props.form;
    let user = this.state.users;
    return (
      <div className="main">
        <div className="container">
          {this.state.users.map((item, index) => {
              return (<div><div className="itemflex" >
              <p className="imageflex"> <img src={"https://avatars.dicebear.com/v2/avataaars/" + item.username + ".svg?options[mood][]=happy "}></img> </p>

              <p className="detail"><b>{item.name}</b> </p>
              <p className="detail"><Icon type="mail" />{item.email}</p>

              <p className="detail"><Icon type="phone" />{item.phone} </p>
              <p className="detail"><Icon type="global" />{item.website}</p>
            </div>
              <div className="iconContainer">

                <Button type="link" className="iconheart" icon="heart" onClick={() => this.like()} />
                <Button type="link" className="iconItem" icon="edit" onClick={() => this.showModal(index)} />
                <Modal
                  title="Edit Details"
                  visible={this.state.visible}

                  onCancel={this.handleCancel}
                  onOk={this.handleOk}
                >
                  <div >


                    <form className="mainform">
                      <Form.Item label="Name">
                        {getFieldDecorator('name', {
                          initialValue: this.state.users[index].name,
                          rules: [

                            {
                              required: true,
                              message: 'Please input your E-mail!',
                            },
                          ],
                        })(<Input />)}
                      </Form.Item>

                      <Form.Item label="E-mail">
                        {getFieldDecorator('email', {
                          rules: [
                            {
                              type: 'email',
                              message: 'The input is not valid E-mail!',
                            },
                            {
                              required: true,
                              message: 'Please input your E-mail!',
                            },
                          ],
                        })(<Input />)}
                      </Form.Item><Form.Item label="phone">
                        {getFieldDecorator('phone', {
                          rules: [

                            {
                              required: true,
                              message: 'Please input your E-mail!',
                            },
                          ],
                        })(<Input />)}
                      </Form.Item><Form.Item label="web">
                        {getFieldDecorator('web', {
                          rules: [

                            {
                              required: true,
                              message: 'Please input your E-mail!',
                            },
                          ],
                        })(<Input />)}
                      </Form.Item>

                    </form>
                  </div>

                </Modal>


                <Button type="link" className="iconItem" icon="delete" onClick={() => this.delete(index)} />



              </div>
            </div>

            )
          })};

        </div>
      </div>
    )


  }
}
//export default App;
export default Form.create(Users);
