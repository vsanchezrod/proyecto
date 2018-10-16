import { ActividadesModule } from './actividades.module';

describe('ActividadesModule', () => {
  let actividadesModule: ActividadesModule;

  beforeEach(() => {
    actividadesModule = new ActividadesModule();
  });

  it('should create an instance', () => {
    expect(actividadesModule).toBeTruthy();
  });
});
