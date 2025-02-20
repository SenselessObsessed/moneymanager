/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const btn = document.querySelector('.sidebar-toggle');
    btn.addEventListener('click', function(e) {
      e.preventDefault();

      document.body.classList.toggle('sidebar-open');
      document.body.classList.toggle('sidebar-collapse');
    })
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.addEventListener('click', function(e) {
      e.preventDefault();
      if(e.target.innerText === 'Вход') {
        App.getModal( 'login' ).open()
      }
      if(e.target.innerText === 'Регистрация') {
        App.getModal( 'register' ).open()
      }
      if(e.target.innerText === 'Выйти') {
        User.logout((err, response) => {
          if(response && response.success) {
            App.setState( 'init' );
          } else {
            alert(response.error)
          }
        });
      }
    })
  }
}