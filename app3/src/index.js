console.log('Hello from app3');

require('gatest-app1');

export function FOO() {
    throw new Error('foo');
}