
import type { ModelPerformance } from './types';

export const modelData: ModelPerformance[] = [
    { name: 'BERT (Transformer)', accuracy: 0.9975, precision: 0.9750, recall: 1.0000, f1Score: 0.9873, hyperparameters: { subset: '2000 rows', model: 'bert-base-uncased' } },
    { name: 'Tuned SVM', accuracy: 0.9821, precision: 0.9851, recall: 0.8800, f1Score: 0.9296, hyperparameters: { C: 1, kernel: 'linear' } },
    { name: 'Initial SVM', accuracy: 0.9821, precision: 0.9851, recall: 0.8800, f1Score: 0.9296, hyperparameters: { C: 1.0, kernel: 'rbf', gamma: 'scale' } },
    { name: 'Random Forest', accuracy: 0.9722, precision: 1.0000, recall: 0.7933, f1Score: 0.8848, hyperparameters: { n_estimators: 100, max_depth: 'None' } },
    { name: 'Gradient Boosting', accuracy: 0.9713, precision: 1.0000, recall: 0.7867, f1Score: 0.8806, hyperparameters: { n_estimators: 100, 'learning_rate': 0.1 } },
    { name: 'Naive Bayes', accuracy: 0.9677, precision: 1.0000, recall: 0.7600, f1Score: 0.8636, hyperparameters: { alpha: 1.0 } },
    { name: 'Logistic Regression', accuracy: 0.9659, precision: 1.0000, recall: 0.7467, f1Score: 0.8550, hyperparameters: { C: 1.0, solver: 'lbfgs' } },
];

export const bestModel = modelData[0];
