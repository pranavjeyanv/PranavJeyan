import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { certificatesData } from '../data/certificates';
import { FileText, Image as ImageIcon, ChevronRight, Download } from 'lucide-react';

const CertificateViewerModal = ({ certificate, onClose }) => {
  if (!certificate) return null;

  const isPDF = certificate.format === 'pdf';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#1a1f3a] border border-cyan-400/40 rounded-lg overflow-hidden max-w-4xl w-full max-h-[90vh]"
      >
        <div className="flex items-center justify-between p-4 border-b border-cyan-400/20">
          <h3 className="text-xl font-bold text-white">{certificate.title}</h3>
          <div className="flex gap-2">
            {isPDF && (
              <a
                href={certificate.file}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-cyan-500/20 rounded-lg transition-colors"
              >
                <Download className="w-6 h-6 text-cyan-400" />
              </a>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
            >
              <span className="text-red-400 text-2xl">×</span>
            </button>
          </div>
        </div>

        <div className="p-4 overflow-auto max-h-[calc(90vh-80px)]">
          {isPDF ? (
            <iframe
              src={certificate.file}
              title={certificate.title}
              className="w-full h-96 rounded-lg"
            />
          ) : (
            <img
              src={certificate.file}
              alt={certificate.title}
              className="w-full rounded-lg max-h-[70vh] object-contain"
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const ExperienceCertificates = () => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="certificates" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#1a1f3a] to-[#0a0e27]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Experience Certificates</h2>
          <p className="text-cyan-400 text-lg">Professional credentials and work experience documentation</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {certificatesData.map((cert) => (
            <motion.div
              key={cert.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedCertificate(cert)}
              className="cursor-pointer group"
            >
              <div className="p-6 rounded-lg border border-cyan-400/30 bg-gradient-to-br from-[#1a1f3a] to-[#2a2f4a] hover:border-cyan-400/60 hover:bg-cyan-500/5 transition-all duration-300 h-full flex flex-col">
                {/* Icon */}
                <div className="mb-4">
                  {cert.format === 'pdf' ? (
                    <div className="inline-block p-3 rounded-lg bg-cyan-500/20 text-cyan-400">
                      <FileText className="w-6 h-6" />
                    </div>
                  ) : (
                    <div className="inline-block p-3 rounded-lg bg-cyan-500/20 text-cyan-400">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {cert.title}
                </h3>
                <p className="text-cyan-300 text-sm font-medium">{cert.organization}</p>
                <p className="text-gray-400 text-sm mt-1">{cert.role}</p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-cyan-400/20">
                  <span className="text-gray-500 text-xs">{cert.year}</span>
                  <span className="text-cyan-400 text-sm font-medium">{cert.type}</span>
                </div>

                {/* Hover indicator */}
                <div className="mt-4 flex items-center gap-2 text-cyan-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>View Certificate</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Certificate Viewer Modal */}
        {selectedCertificate && (
          <CertificateViewerModal
            certificate={selectedCertificate}
            onClose={() => setSelectedCertificate(null)}
          />
        )}

        {/* Info note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 p-4 rounded-lg bg-cyan-500/10 border border-cyan-400/30 text-center"
        >
          <p className="text-gray-300 text-sm">
            Click on any certificate to view or download the document
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceCertificates;
