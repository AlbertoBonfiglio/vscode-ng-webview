(function () {
  console.log('SOOOCA');
  // @ts-ignore
  const vscode = acquireVsCodeApi();

  window.addEventListener('message', (event) => {
    console.log(event);
      if (event.data.from === 'iframe') {
          // @ts-ignore
          vscode.postMessage(event.data);
      } else if (event.data.from === 'extension') {
          // @ts-ignore
          document.querySelector('iframe').contentWindow.postMessage(event.data, '*');
      }
  });

  const items = document.getElementById('app');
    //'item UserPopup_menuItem__yaw_D');

  console.log('found  --> ', items?.ATTRIBUTE_NODE);


}());
