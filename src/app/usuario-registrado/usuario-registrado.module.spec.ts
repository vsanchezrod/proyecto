import { UsuarioRegistradoModule } from './usuario-registrado.module';

describe('UsuarioRegistradoModule', () => {
  let usuarioRegistradoModule: UsuarioRegistradoModule;

  beforeEach(() => {
    usuarioRegistradoModule = new UsuarioRegistradoModule();
  });

  it('should create an instance', () => {
    expect(usuarioRegistradoModule).toBeTruthy();
  });
});
