document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const messageBox = document.getElementById('formMessage');
  if (!form) return;

  const setMessage = (text, isSuccess = false) => {
    if (!messageBox) return;
    messageBox.textContent = text;
    messageBox.classList.toggle('success', isSuccess);
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.trim().length >= 2 || '請輸入至少 2 個字的姓名';
      case 'phone':
        return /^09\d{8}$/.test(value.replace(/\s|-/g, '')) || '請輸入有效的手機號碼，例如 0912345678';
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || '請輸入有效的 Email';
      case 'travel-date':
        return value ? true : '請選擇日期';
      case 'location':
      case 'travel-method':
      case 'participants':
        return value ? true : '請選擇此欄位';
      case 'gender':
        return form.querySelector('input[name="gender"]:checked') ? true : '請選擇性別';
      case 'notes':
        return value.trim().length <= 200 || '備註請勿超過 200 個字';
      default:
        return true;
    }
  };

  form.querySelectorAll('input, select, textarea').forEach((field) => {
    field.addEventListener('input', () => {
      if (field.name === 'gender') return;
      const result = validateField(field.name, field.value);
      if (result !== true) {
        setMessage(result);
      } else {
        setMessage('');
      }
    });

    field.addEventListener('change', () => {
      if (field.name === 'gender') {
        const result = validateField(field.name, field.value);
        if (result !== true) {
          setMessage(result);
        } else {
          setMessage('');
        }
        return;
      }
      const result = validateField(field.name, field.value);
      if (result !== true) {
        setMessage(result);
      } else {
        setMessage('');
      }
    });
  });

  form.addEventListener('submit', (event) => {
    const fields = ['name', 'phone', 'email', 'travel-date', 'location', 'travel-method', 'participants', 'gender'];
    let firstError = '';

    for (const name of fields) {
      const value = name === 'gender'
        ? form.querySelector('input[name="gender"]:checked')?.value || ''
        : form.elements[name]?.value || '';
      const result = validateField(name, value);
      if (result !== true) {
        firstError = result;
        break;
      }
    }

    if (firstError) {
      event.preventDefault();
      setMessage(firstError);
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = '提交中...';
    }

    setMessage('表單檢查通過，正在提交...', true);
  });
});
