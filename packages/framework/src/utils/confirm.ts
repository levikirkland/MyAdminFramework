import { createVNode, render } from 'vue';
import MaConfirmModal from '../components/MaConfirmModal.vue';

export interface ConfirmOptions {
  title?: string;
  content: string;
  type?: 'info' | 'success' | 'warning' | 'error' | 'confirm';
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => Promise<void> | void;
  onCancel?: () => void;
}

export const MaConfirm = (options: ConfirmOptions) => {
  const container = document.createElement('div');
  document.body.appendChild(container);

  // We need to handle the destruction of the container
  // Since MaConfirmModal controls its own visibility via v-model,
  // we can watch for when it's closed.
  // However, MaModal uses Teleport, so the content is moved elsewhere.
  // The container we created will hold the MaConfirmModal instance (which is empty in DOM because of Teleport)
  // but the Teleport target is body.
  
  // A simple way is to pass a prop to MaConfirmModal to let it know to destroy itself?
  // Or we can wrap it.
  
  // Let's use a wrapper component that handles the cleanup?
  // Or just rely on the fact that when we render(null, container), it will unmount.
  
  // We can pass a callback to onCancel/onConfirm to cleanup.
  
  const cleanup = () => {
    // Delay cleanup to allow animation to finish
    setTimeout(() => {
      render(null, container);
      document.body.removeChild(container);
    }, 300); // Match transition duration
  };

  const originalOnConfirm = options.onConfirm;
  const originalOnCancel = options.onCancel;

  const vnode = createVNode(MaConfirmModal, {
    ...options,
    onConfirm: async () => {
      if (originalOnConfirm) {
        await originalOnConfirm();
      }
      cleanup();
    },
    onCancel: () => {
      if (originalOnCancel) {
        originalOnCancel();
      }
      cleanup();
    }
  });

  render(vnode, container);
};
