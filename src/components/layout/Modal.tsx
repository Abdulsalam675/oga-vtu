import { memo, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";

interface ModalProps {
  open: boolean;
  onClose?: () => void;
  children: ReactNode;
  showDash?: boolean;
}

function Modal({ open, onClose, children, showDash = true }: ModalProps) {
  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Fires when the user releases the drag
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    // Close if pulled down past 130px, or flicked down fast
    if (info.offset.y > 170 || info.velocity.y > 300) {
      onClose?.();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
          <motion.div
            className="absolute inset-0 bg-gray-dark/50 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            className="relative z-10 w-full max-w-md rounded-t-3xl bg-white p-5 sm:rounded-3xl"
            initial={{ y: "100%", opacity: 0.9 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0.9 }}
            transition={{ type: "spring", damping: 26, stiffness: 330 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            dragTransition={{ bounceStiffness: 700, bounceDamping: 35 }}
            dragSnapToOrigin
            onDragEnd={handleDragEnd}
            onClick={(e) => e.stopPropagation()}
          >
            {showDash && (
              <div className="mb-4 flex cursor-grab justify-center active:cursor-grabbing sm:hidden">
                <div className="h-1.5 w-10 rounded-full bg-gray-lighter" />
              </div>
            )}

            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default memo(Modal);
