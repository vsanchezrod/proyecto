import { CompartidosModule } from './compartidos.module';

describe('CompartidosModule', () => {
  let compartidosModule: CompartidosModule;

  beforeEach(() => {
    compartidosModule = new CompartidosModule();
  });

  it('should create an instance', () => {
    expect(compartidosModule).toBeTruthy();
  });
});
