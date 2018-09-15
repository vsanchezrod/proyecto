import { SalidasModule } from './salidas.module';

describe('SalidasModule', () => {
  let salidasModule: SalidasModule;

  beforeEach(() => {
    salidasModule = new SalidasModule();
  });

  it('should create an instance', () => {
    expect(salidasModule).toBeTruthy();
  });
});
