/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)

    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const currentUser = User.current();
    const render = this.element.querySelector('.accounts-select');
    
    if(currentUser) {
      Account.list(currentUser, (err, response) => {
        if(response && response.success) {
          render.innerHTML = '';
          const data = response.data;
          data.forEach(item => render.insertAdjacentHTML('beforeend', `<option value="${item.id}">${item.name}</option>`))
        }
      })
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if(response && response.success) {
        App.update();
        this.element.reset();
        this.element.closest('.modal').style.display = '';
      }
    })
  }
}