import { AcercaDeModule } from './acerca-de.module';

describe('AcercaDeModule', () => {
  let acercaDeModule: AcercaDeModule;

  beforeEach(() => {
    acercaDeModule = new AcercaDeModule();
  });

  it('should create an instance', () => {
    expect(acercaDeModule).toBeTruthy();
  });
});
