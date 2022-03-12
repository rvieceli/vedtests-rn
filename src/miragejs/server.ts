import { Server } from 'miragejs';
import factories from './factories';
import routes from './routes';
import models from './models';
import seeds from './seeds';

type EnvType = 'development' | 'test';

interface MakeServerProps {
  environment?: EnvType;
}

const setup = (environment: EnvType = 'development') => {
  const config = {
    environment,
    factories,
    models,
    routes,
    seeds,
  };

  return config;
};

export function makeServer({ environment = 'development' }: MakeServerProps = {}) {
  return new Server(setup(environment));
}
