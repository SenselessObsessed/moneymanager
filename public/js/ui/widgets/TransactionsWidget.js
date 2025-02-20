/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */
class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if(!element) throw new Error('Not found element');
    this.element = element;

    this.registerEvents();
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    const transactionPanel = document.querySelector('.transactions-panel');
    transactionPanel.addEventListener('click', (e) => {
      if(e.target.classList.contains('btn-success') || e.target.classList.contains('fa-thumbs-o-up')) {
        App.getModal('newIncome').open();
      }
      if(e.target.classList.contains('btn-danger') || e.target.classList.contains('fa-thumbs-o-down')) {
        App.getModal('newExpense').open();
      }
    })
  }
}
